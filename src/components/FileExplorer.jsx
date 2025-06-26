import React, { useState } from "react";
import Tree from "./Tree";

const jsonData = [
  {
    id: 1,
    name: "Document",
    type: "folder",
    children: [
      {
        id: 2,
        name: "resume.pdf",
        type: "file",
      },
      {
        id: 3,
        name: "Projects",
        type: "folder",
        children: [
          {
            id: 4,
            name: "project.txt",
            type: "file",
          },
        ],
      },
    ],
  },
];

export default function FileExplorer() {
  const [fileSystem, setFileSystem] = useState(jsonData);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileClick = (file) => {
    setSelectedFile(file);
  };

  const handleRename = (node, newName) => {
    const renameNode = (nodes) =>
      nodes.map((n) => {
        if (n.id === node.id) return { ...n, name: newName };
        if (n.children) return { ...n, children: renameNode(n.children) };
        return n;
      });
    setFileSystem(renameNode(fileSystem));
  };

  const handleDelete = (node) => {
    const deleteNode = (nodes) =>
      nodes
        .filter((n) => n.id !== node.id)
        .map((n) =>
          n.children ? { ...n, children: deleteNode(n.children) } : n
        );
    setFileSystem(deleteNode(fileSystem));
  };

  const handleAdd = (parent) => {
    const name = prompt("Enter name");
    const type = prompt("Type: file or folder");
    if (!name || (type !== "file" && type !== "folder")) return;

    const newItem = {
      id: Math.random(),
      name,
      type,
      ...(type === "folder" && { children: [] }),
    };

    const addToTree = (nodes) =>
      nodes.map((node) => {
        if (node.id === parent.id) {
          return { ...node, children: [...(node.children || []), newItem] };
        }
        if (node.children) {
          return { ...node, children: addToTree(node.children) };
        }
        return node;
      });

    setFileSystem(addToTree(fileSystem));
  };

  return (
    <div className="flex h-screen bg-gray-100 text-gray-900">
      <div className="w-64 bg-white border-r border-gray-200 p-3 overflow-auto">
        <h2 className="text-sm font-bold mb-4 uppercase text-gray-600">
          Explorer
        </h2>
        <div>
          {fileSystem.map((node) => (
            <Tree
              key={node.id}
              node={node}
              onFileClick={handleFileClick}
              onRename={handleRename}
              onDelete={handleDelete}
              onAdd={handleAdd}
              setSelectedFile={setSelectedFile}
            />
          ))}
        </div>
      </div>

      <div className="flex-1 p-4">
        {selectedFile ? (
          <div className="p-4 bg-green-100 text-green-800 border border-green-300 rounded">
            Selected File: {selectedFile.name}
          </div>
        ) : (
          <div className="p-4 bg-blue-100 text-blue-800 border border-blue-300 rounded">
            No file selected
          </div>
        )}
      </div>
    </div>
  );
}
