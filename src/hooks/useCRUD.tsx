import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { AppDispatch } from "../redux/store";
import {
  createItem,
  deleteItem,
  fetchItems,
  updateItem,
} from "../redux/reducer/crudslice";
import { getIdTokenResult, signOut } from "firebase/auth";
import { auth } from "../config/firebase/index";
import { logout } from "../redux/reducer/authSlice";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { login } from "../redux/reducer/authSlice";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function useCRUD() {
  const id = uuidv4();
  const dispatch = useDispatch<AppDispatch>();
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [confirmPassword, setConfirmPassword] = useState("");

  const [formData, setFormData] = useState({
    id: "",
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      createItem({
        id: id,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      })
    );
  };

  const handleDelete = (id: string) => {
    dispatch(deleteItem(id));
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(updateItem(formData));
  };

  const handleEdit = (item: {
    id: string;
    username: string;
    email: string;
    password: string;
    role: string;
  }) => {
    setFormData(item);

    console.log("crud", item, formData);
  };
  const handleLogout = async () => {
    await signOut(auth);
    dispatch(logout());
    navigate("/login");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const tokenResult = await getIdTokenResult(user);
      const role = tokenResult.claims.role || "user";
      dispatch(login({ email: userCredential.user.email!, role }));
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setSuccess(`User registered: ${userCredential.user.email}`);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setError(err.message);
    }
  };
  return {
    formData,
    openModal,
    email,
    password,
    error,
    confirmPassword,
    success,
    openEditModal,
    navigate,
    setOpenEditModal,
    setFormData,
    setOpenModal,
    setEmail,
    setPassword,
    setError,
    setConfirmPassword,
    handleDelete,
    handleSubmit,
    handleEdit,
    handleUpdate,
    handleLogout,
    handleLogin,
    handleRegister,
  };
}
