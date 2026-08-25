import { Button } from '@repo/ui/components/ui/button';
import { Input } from '@repo/ui/components/ui/input';
import { Label } from '@repo/ui/components/ui/label';
import { Switch } from '@repo/ui/components/ui/switch';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@repo/ui/components/ui/tabs';
import { Section } from '../section';

export function TabsSection() {
  return (
    <Section
      title="Tabs"
      description="Organize content into switchable panels."
    >
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="tab-name">Name</Label>
            <Input id="tab-name" defaultValue="Pedro Duarte" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tab-username">Username</Label>
            <Input id="tab-username" defaultValue="@peduarte" />
          </div>
          <Button>Save changes</Button>
        </TabsContent>
        <TabsContent value="password" className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="current">Current password</Label>
            <Input id="current" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new">New password</Label>
            <Input id="new" type="password" />
          </div>
          <Button>Change password</Button>
        </TabsContent>
        <TabsContent value="notifications" className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Push Notifications</p>
              <p className="text-xs text-muted-foreground">
                Receive push notifications on your devices.
              </p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Email Notifications</p>
              <p className="text-xs text-muted-foreground">
                Receive email when someone mentions you.
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </TabsContent>
      </Tabs>
    </Section>
  );
}
