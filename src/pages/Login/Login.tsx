import { useInput } from "../../hooks/input.hook.tsx";
import { FormEvent } from "react";

function Login() {
  const email = useInput('')
  const password = useInput('')


  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    console.log(email.value)
    console.log(password.value)
  }

  return (
    <>
      Login Page
      <div>
        <form>
          <input type="email" name="email" id="email" placeholder="Email" autoComplete='email' required onChange={email.onChange} />
          <input type="password" name="password" id="password" placeholder="Password" autoComplete='current-password' required onChange={password.onChange} />
          <input type="submit" value="Login"  onClick={handleSubmit} />
        </form>
      </div>
    </>
  );
}

export default Login;