# Contributing to Monorepo Full-Stack Starter

Thank you for your interest in contributing to this project! We welcome contributions from everyone.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended package manager)
- Git

### Development Setup

1. **Fork and clone the repository**

   ```bash
   git clone https://github.com/your-username/monorepo-fullstack-starter.git
   cd monorepo-fullstack-starter
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Start development servers**

   ```bash
   # Start all apps
   pnpm dev

   # Or start specific apps
   pnpm dev --filter=web
   pnpm dev --filter=@repo/dashboard
   pnpm dev --filter=api
   ```

4. **Run tests**
   ```bash
   pnpm test
   ```

## 📁 Project Structure

```text
├── apps/
│   ├── api/          # Rust API (Actix-Web + SQLx)
│   ├── dashboard/    # Admin dashboard (Vite + React)
│   ├── docs/         # Documentation site (Next.js + Fumadocs)
│   └── web/          # Landing page (Next.js + R3F)
├── packages/
│   ├── api-types/    # Auto-generated TS types from Rust
│   ├── eslint-config/# Shared ESLint config
│   ├── tailwind-config/# Shared Tailwind CSS theme
│   ├── typescript-config/ # Shared TypeScript config
│   └── ui/           # Shared UI components
└── .github/          # GitHub workflows
```

## 🛠️ Development Guidelines

### Code Style

We use automated tools to maintain code quality:

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **Commitlint** - Commit message linting

### Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

feat(ui): add new button component
fix(api): resolve authentication issue
docs: update README with setup instructions
```

**Types:**

- `feat` - New features
- `fix` - Bug fixes
- `docs` - Documentation changes
- `style` - Code style changes
- `refactor` - Code refactoring
- `test` - Adding tests
- `chore` - Maintenance tasks

### Branch Naming

Use descriptive branch names:

- `feat/add-user-authentication`
- `fix/resolve-build-error`
- `docs/update-contributing-guide`

## 🧪 Testing

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests for specific package
pnpm test --filter=web
pnpm test --filter=api

# Run tests in watch mode
pnpm test:watch
```

### Writing Tests

- Write unit tests for utility functions
- Add integration tests for API endpoints
- Include component tests for UI components
- Ensure good test coverage

## 📦 Adding Dependencies

### Workspace Dependencies

```bash
# Add to specific workspace
pnpm add <package> --filter=web
pnpm add <package> --filter=api

# Add to root (affects all workspaces)
pnpm add <package> -w
```

### UI Components

When adding new UI components:

1. Create the component in `packages/ui/src/`
2. Export it from `packages/ui/src/index.ts`
3. Add it to the component demos in `apps/web/src/app/sandbox/`
4. Update documentation

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Description** - Clear description of the issue
2. **Steps to reproduce** - Detailed steps
3. **Expected behavior** - What should happen
4. **Actual behavior** - What actually happens
5. **Environment** - OS, Node version, browser, etc.
6. **Screenshots** - If applicable

Use our bug report template when creating issues.

## 💡 Feature Requests

For feature requests:

1. Check existing issues first
2. Describe the feature clearly
3. Explain the use case
4. Consider implementation approach
5. Be open to discussion

## 🔄 Pull Request Process

`main` is production and `staging` is development. Feature branches start
from `staging` and open their PR against `staging`; a `staging` -> `main` PR
(merged with "Create a merge commit") ships a release, and a `v*` tag on
`main` builds and deploys it. CI runs on pull requests only.

1. **Create a feature branch**

   ```bash
   git checkout staging && git pull
   git checkout -b feat/your-feature-name
   ```

2. **Make your changes**
   - Follow coding standards
   - Add tests if needed
   - Update documentation

3. **Test your changes**

   ```bash
   pnpm build
   pnpm test
   pnpm lint
   ```

4. **Commit your changes**

   ```bash
   git add .
   git commit -m "feat: add your feature"
   ```

5. **Push and create a PR into `staging`**

   ```bash
   git push origin feat/your-feature-name
   ```

6. **PR Requirements**
   - Clear title and description
   - Link related issues
   - Include screenshots for UI changes
   - Ensure CI passes
   - Request review

## 📋 Code Review Guidelines

### For Authors

- Keep PRs focused and small
- Write clear commit messages
- Add tests for new features
- Update documentation
- Respond to feedback promptly

### For Reviewers

- Be constructive and respectful
- Focus on code quality and maintainability
- Test the changes locally if needed
- Approve when satisfied

## 🏗️ Architecture Decisions

For significant changes:

1. Open an issue for discussion
2. Consider impact on existing code
3. Document architectural decisions
4. Get consensus from maintainers

## 📚 Documentation

Help improve our docs:

- Fix typos and unclear sections
- Add examples and use cases
- Update setup instructions
- Create tutorials

## 🤝 Community

- Be respectful and inclusive
- Help others in discussions
- Share knowledge and experience
- Follow our Code of Conduct

## 📞 Getting Help

- **Issues** - For bugs and feature requests
- **Discussions** - For questions and ideas
- **Discord** - For real-time chat (if available)

## 🎉 Recognition

Contributors will be:

- Added to the contributors list
- Mentioned in release notes
- Credited for significant contributions

Thank you for contributing! 🚀

---

## Quick Commands Reference

```bash
# Development
pnpm dev                    # Start all apps
pnpm dev --filter=web      # Start web app only
pnpm build                 # Build all packages
pnpm test                  # Run all tests
pnpm lint                  # Lint all code
pnpm format                # Format all code

# Package management
pnpm add <pkg> --filter=web    # Add to web app
pnpm add <pkg> -w              # Add to workspace root
pnpm install                   # Install all dependencies

# Git workflow
git checkout -b feat/new-feature
git add .
git commit -m "feat: add new feature"
git push origin feat/new-feature
```
