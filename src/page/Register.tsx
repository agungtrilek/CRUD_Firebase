import React, { useRef, useState } from "react";

import {
  Button,
  Label,
  Modal,
  ModalFooter,
  Select,
  TextInput,
} from "flowbite-react";
import { Link } from "react-router-dom";
import useCRUD from "../hooks/useCRUD";

const Register: React.FC = () => {
  const {
    handleRegister,
    email,
    password,
    error,
    success,
    confirmPassword,
    setEmail,
    setPassword,
    setConfirmPassword,
  } = useCRUD();

  const emailInputRef = useRef<HTMLInputElement>(null);
  const [role, setRole] = useState("user");
  return (
    <div>
      {/* <h2>Register</h2>
      <form onSubmit={handleRegister}>
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
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
      </form> */}
      {/* =============================================================== */}
      <Modal size="md" show={true} initialFocus={emailInputRef}>
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Register
            </h3>
            <form
              className="flex max-w-md flex-col gap-4"
              onSubmit={handleRegister}
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
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password" value="Confirm password" />
                </div>
                <TextInput
                  id="password"
                  type="password"
                  required
                  shadow
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="max-w-md">
                <div className="mb-2 block">
                  <Label htmlFor="countries" value="Pilih Role" />
                </div>
                <Select
                  id="countries"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value={"user"}>user</option>
                  <option value={"admin"}>admin</option>
                </Select>
              </div>

              <Button type="submit">Register</Button>
              {error && <p style={{ color: "red" }}>{error}</p>}
              {success && <p style={{ color: "green" }}>{success}</p>}
              <ModalFooter>
                <p>
                  Sudah punya akun?{" "}
                  <Link className="text-blue-500" to={"/login"}>
                    Masuk
                  </Link>
                </p>
              </ModalFooter>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Register;
