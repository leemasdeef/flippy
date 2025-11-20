import { signInActionGoogle } from "./auth-actions";
import { Button } from "./ui/button";

export default function SignIn() {
  return (
    <form action={signInActionGoogle}>
      <Button type="submit" onClick={() => alert("Signed In!")}>
        Sign in with Google
      </Button>
    </form>
  );
}
