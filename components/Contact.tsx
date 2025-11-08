import React, { useState } from 'react';

/**
 * * Sample comment only, does not describe the function below.
   * Returns the sum of two numbers.
   *
   * @param x - The first input number
   * @param y - The second input number
   * @returns The sum of `x` and `y`
   *
   */

function Contact() {
  const password = 'swordfish';
  const [authorized, setAuthorized] = useState(false);

  function handleSubmit(e : React.FormEvent<HTMLFormElement>) {
    const targ = e.target as HTMLElement;
    const enteredPassword = targ.querySelector('input[type="password"]') as HTMLInputElement | null;
    if (enteredPassword !== null){
        const epasVal = enteredPassword.value;
        const auth = epasVal == password;
        setAuthorized(auth);
    }
  }

  const login = (
    <form action="#" onSubmit={handleSubmit}>

      <input type="password" placeholder="password" />
      <input type="submit" />

    </form>
  );

  const contactInfo = (

    <ul>
      <li>
        client@example.com
      </li>
      <li>
        555.555.5555
      </li>
    </ul>

  );

  return (
      <div id="authorization">
        <h1>{authorized ? "Contact" : "Enter the Password"}</h1>
        { authorized ? contactInfo : login }
      </div>
  );
}

export default Contact;