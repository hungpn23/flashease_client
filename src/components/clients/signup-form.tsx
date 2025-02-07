import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SignUpForm() {
  return (
    <form>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">
            Email<span className="text-red-500">*</span>
          </Label>

          <Input
            name="email"
            type="email"
            placeholder="user@example.com"
            tabIndex={1}
            autoFocus
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password">
            Password<span className="text-red-500">*</span>
          </Label>

          <Input name="password" type="password" tabIndex={2} required />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password">
            Confirm password<span className="text-red-500">*</span>
          </Label>

          <Input name="password" type="password" tabIndex={3} required />
        </div>

        <Button type="submit" className="w-full">
          Sign up
        </Button>
      </div>
    </form>
  );
}
