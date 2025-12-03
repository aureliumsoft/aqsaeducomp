import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardHeader, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GithubIcon } from "lucide-react";

export default function Login() {
    return (
        <div className="">
            <Card>
                <CardHeader>
                    <CardTitle>Welcome back!</CardTitle>
                    <CardDescription>Login with your Google account</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <Button variant="outline" className="w-full">
                        <GithubIcon className="size-4"/>
                        Sign in with Google
                    </Button>
                    <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:items-center after:border-t after:border-border">
                        <span className="relative z-10 bg-card px-2 text-muted-foreground">Or Continue with </span>
                    </div>

                    <div className="grid gap-3">
                        <div className="grid gap-2">
                            <Label>Email</Label>
                            <Input type="email" placeholder="email@example.com" />
                        </div>
                    </div>
                    <Button className="w-full" type="submit">
                        Continue with Email
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}