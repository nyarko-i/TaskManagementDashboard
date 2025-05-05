import React from "react";
import ThemeToggle from "./ThemeToggle";

const TaskCard = ({ task, onDelete, onEdit }) => {

  return (
    <div className="p-4 rounded-md shadow-md">
       
      <h3 className="font-bold text-lg">{task.title}</h3>
      <p className="text-gray-600">Due Date: {task.dueDate}</p>
      <p>
        Status:{" "}
        <span
          className={`font-semibold ${
            task.status === "pending"
              ? "text-yellow-500"
              : task.status === "in-progress"
              ? "text-blue-500"
              : "text-green-500"
          }`}
        >
          {task.status}
        </span>
      </p>
      <p>Assigned User: {task.assignedUserId || "Unassigned"}</p>

      {task.files && task.files.length > 0 && (
        <div className="mt-2">
          {/* Section Header for Attached Files */}
          <p className="font-bold">Attached Files:</p>

          {task.files.map((file, index) => {
            return (
              <div key={index}>
                {/* Check if the file type is an image, and display it accordingly */}
                {file.type.startsWith("image/") ? (
                  <div>
                    <p className="text-blue-500">
                      <a
                        href={file.previewUrl} // Direct link to the image file
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline cursor-pointer"
                      >
                        {file.name} ({file.type})
                      </a>
                    </p>
                    <img
                      src={file.previewUrl}
                      alt={file.name}
                      className="w-32 h-32 object-cover mt-2"
                    />
                  </div>
                ) : (
                  <p className="text-blue-500">
                    <a
                      href={file.previewUrl} // Direct link for non-image files (e.g., PDFs)
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline cursor-pointer"
                    >
                      {file.name} ({file.type})
                    </a>
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Edit and Delete Buttons */}
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => onEdit(task)} // Trigger edit functionality
          className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)} // Trigger delete functionality
          className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
