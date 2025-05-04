import React from "react";

const TaskCard = ({ task, onDelete, onEdit }) => {
  return (
    <div className=" p-4 rounded-md shadow-md bg-white">
      <h3 className="font-bold text-lg">{task.title}</h3>
      <p className="text-gray-600">Due Date: {task.dueDate}</p>
      <p>Status: <span className={`font-semibold ${task.status === 'pending' ? 'text-yellow-500' : task.status === 'in-progress' ? 'text-blue-500' : 'text-green-500'}`}>{task.status}</span></p>
      <p>Assigned User: {task.assignedUserId || "Unassigned"}</p>

      {task.files && task.files.length > 0 && (
        <div className="mt-2">
          <p className="font-bold">Attached Files:</p>
          {task.files.map((file, index) => (
            <p key={index} className="text-blue-500">{file.name} ({file.type})</p>
          ))}
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
