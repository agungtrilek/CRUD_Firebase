import React, { useRef } from "react";

import { Link } from "react-router-dom";
import { Button, Label, Modal, ModalFooter, TextInput } from "flowbite-react";
import useCRUD from "../hooks/useCRUD";

const Login: React.FC = () => {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const { email, setEmail, password, setPassword, error, handleLogin } =
    useCRUD();

  return (
    <div>
      {/* <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form> */}
      {/* ========================================================== */}
      <Modal size="md" show={true} initialFocus={emailInputRef}>
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Login
            </h3>
            <form
              className="flex max-w-md flex-col gap-4"
              onSubmit={handleLogin}
            >
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="Email" value="Masukkan Email" />
                </div>
                <TextInput
                  id="Email"
                  type="email"
                  required
                  shadow
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password" value="Masukkan Password" />
                </div>
                <TextInput
                  id="password"
                  type="password"
                  required
                  shadow
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button type="submit">Login</Button>
              {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
          </div>
        </Modal.Body>
        <ModalFooter>
          <p>
            belum punya akun?{" "}
            <Link className="text-blue-500" to={"/register"}>
              Daftar
            </Link>
          </p>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Login;
