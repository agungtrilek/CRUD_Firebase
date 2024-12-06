import {
  Button,
  Checkbox,
  Label,
  Modal,
  Select,
  TextInput,
} from "flowbite-react";
import { useRef, useState } from "react";
import useCRUD from "../../hooks/useCRUD";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export default function EditModal({ data }: { data: any }) {
  const {
    handleSubmit,
    formData,
    setFormData,
    openEditModal,
    setOpenEditModal,
    handleUpdate,
    handleEdit,
  } = useCRUD();
  const { loading, error } = useSelector((state: RootState) => state.crud);
  const emailInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Button
        onClick={() => (
          setOpenEditModal(true), console.log("edit", data), handleEdit(data)
        )}
      >
        Edit
      </Button>

      {loading && <p>loading...</p>}
      {error && <p>Error: {error}</p>}
      <Modal
        show={openEditModal}
        size="md"
        popup
        onClose={() => setOpenEditModal(false)}
        initialFocus={emailInputRef}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Edit
            </h3>
            <form
              className="flex max-w-md flex-col gap-4"
              onSubmit={handleUpdate}
            >
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="username" value="Masukkan Username" />
                </div>
                <TextInput
                  id="username"
                  type="text"
                  required
                  shadow
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email2" value="Masukkan email" />
                </div>
                <TextInput
                  id="email2"
                  type="email"
                  placeholder="name@flowbite.com"
                  required
                  shadow
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="repeat-password" value="Masukkan password" />
                </div>
                <TextInput
                  id="repeat-password"
                  type="password"
                  required
                  shadow
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
              <div className="max-w-md">
                <div className="mb-2 block">
                  <Label htmlFor="countries" value="Pilih Role" />
                </div>
                <Select
                  id="countries"
                  required
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                >
                  <option value={"user"}>user</option>
                  <option value={"admin"}>admin</option>
                </Select>
              </div>
              <Button type="submit">Perbarui</Button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
