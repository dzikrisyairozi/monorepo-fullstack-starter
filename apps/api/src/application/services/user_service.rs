use std::sync::Arc;
use uuid::Uuid;

use crate::application::dto::user_dto::{CreateUserRequest, UpdateUserRequest, UserResponse};
use crate::domain::entities::user::User;
use crate::domain::errors::DomainError;
use crate::domain::repositories::user_repository::UserRepository;

/// Application service that orchestrates user-related use cases.
///
/// This service sits between the API handlers and the domain layer.
/// It depends on the `UserRepository` *trait*, never on concrete implementations,
/// which keeps the domain pure and the infra swappable.
pub struct UserService {
    user_repo: Arc<dyn UserRepository>,
}

impl UserService {
    pub fn new(user_repo: Arc<dyn UserRepository>) -> Self {
        Self { user_repo }
    }

    /// List every user.
    pub async fn list_users(&self) -> Result<Vec<UserResponse>, DomainError> {
        let users = self.user_repo.find_all().await?;
        Ok(users.into_iter().map(UserResponse::from).collect())
    }

    /// Fetch a single user by id.
    pub async fn get_user(&self, id: Uuid) -> Result<UserResponse, DomainError> {
        let user = self
            .user_repo
            .find_by_id(id)
            .await?
            .ok_or(DomainError::NotFound {
                entity: "User".into(),
                id,
            })?;

        Ok(UserResponse::from(user))
    }

    /// Create a brand-new user.
    pub async fn create_user(
        &self,
        payload: CreateUserRequest,
    ) -> Result<UserResponse, DomainError> {
        // Check for duplicate email.
        if self
            .user_repo
            .find_by_email(&payload.email)
            .await?
            .is_some()
        {
            return Err(DomainError::Conflict {
                message: format!("A user with email '{}' already exists", payload.email),
            });
        }

        let user = User::new(payload.email, payload.name);
        let created = self.user_repo.create(user).await?;

        Ok(UserResponse::from(created))
    }

    /// Update an existing user.
    pub async fn update_user(
        &self,
        id: Uuid,
        payload: UpdateUserRequest,
    ) -> Result<UserResponse, DomainError> {
        let mut user = self
            .user_repo
            .find_by_id(id)
            .await?
            .ok_or(DomainError::NotFound {
                entity: "User".into(),
                id,
            })?;

        if let Some(email) = payload.email {
            // Check email uniqueness if changing.
            if email != user.email && self.user_repo.find_by_email(&email).await?.is_some() {
                return Err(DomainError::Conflict {
                    message: format!("A user with email '{}' already exists", email),
                });
            }
            user.email = email;
        }

        if let Some(name) = payload.name {
            user.name = name;
        }

        user.updated_at = chrono::Utc::now();

        let updated = self.user_repo.update(user).await?;
        Ok(UserResponse::from(updated))
    }

    /// Delete a user by id.
    pub async fn delete_user(&self, id: Uuid) -> Result<(), DomainError> {
        // Ensure the user exists first.
        self.user_repo
            .find_by_id(id)
            .await?
            .ok_or(DomainError::NotFound {
                entity: "User".into(),
                id,
            })?;

        self.user_repo.delete(id).await
    }
}
