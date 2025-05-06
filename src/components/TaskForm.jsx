import React, { useState } from "react";
import useAuthStore from "../context/authStore"; // ✅ Import user context

// TaskForm Component: Allows users to create/edit tasks
const TaskForm = ({ existingTask, onSave }) => {
  const { user } = useAuthStore(); // ✅ Get current user

  // If editing, pre-fill fields; otherwise, use empty fields for a new task
  const [title, setTitle] = useState(existingTask?.title ?? "");
  const [dueDate, setDueDate] = useState(existingTask?.dueDate ?? "");
  const [status, setStatus] = useState(existingTask?.status ?? "pending");
  const [files, setFiles] = useState(existingTask?.files ?? []);

  // Handle file uploads
  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files).map((file) => ({
      name: file.name,
      type: file.type,
      previewUrl: URL.createObjectURL(file),
    }));
    setFiles(uploadedFiles);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation: Ensure title is provided
    if (!title) {
      alert("Task title is required.");
      return;
    }

    // Validation: Ensure due date is in the future
    if (new Date(dueDate) < new Date()) {
      alert("Due date must be in the future.");
      return;
    }

    // ✅ Include assignedUserId so Dashboard can find task
    onSave({ title, dueDate, status, files, assignedUserId: user.email });

    // Clear form after saving
    setTitle("");
    setDueDate("");
    setStatus("pending");
    setFiles([]);
  };

  return (
    <form
      data-testid="task-form"
      onSubmit={handleSubmit}
      className=" p-4 rounded-md bg-white shadow-md"
    >
      <h3 className="text-lg font-bold mb-2">
        {existingTask ? "Edit Task" : "Create New Task"}
      </h3>

      <label className="block font-semibold" htmlFor="taskTitle">
        Title:
      </label>
      <input
        id="taskTitle"
        type="text"
        className="border p-2 w-full mb-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
      />

      <label htmlFor="dueDate" className="block font-semibold">
        Due Date:
      </label>
      <input
        id="dueDate"
        type="date"
        className="border p-2 w-full mb-2"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <label htmlFor="status" className="block font-semibold">
        Status:
      </label>
      <select
        id="status"
        className="border p-2 w-full mb-2 cursor-pointer"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option className="text-red-600" value="pending">
          Pending
        </option>
        <option className="text-yellow-500" value="in-progress">
          In-Progress
        </option>
        <option className="text-green-600" value="completed">
          Completed
        </option>
      </select>

      <label htmlFor="attachFiles" className="block font-semibold">
        Attach Files:
      </label>
      <input
        id="attachFiles"
        type="file"
        multiple
        className="border p-2 w-full mb-2 cursor-pointer"
        onChange={handleFileUpload}
      />

      {/* Display selected file names */}
      {files.length > 0 && (
        <div className="mt-2">
          <p className="font-bold">Uploaded Files:</p>
          {files.map((file, index) => (
            <p key={index} className="text-blue-500">
              {file.name} ({file.type})
            </p>
          ))}
        </div>
      )}

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 mt-2 rounded cursor-pointer hover:bg-blue-600"
      >
        {existingTask ? "Update Task" : "Create Task"}
      </button>
    </form>
  );
};

export default TaskForm;
