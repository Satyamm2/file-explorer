import React, { useState } from "react";

const Tree = ({
  node,
  onFileClick,
  onRename,
  onDelete,
  onAdd,
  setSelectedFile,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [renaming, setRenaming] = useState(false);
  const [newName, setNewName] = useState(node.name);

  const handleClick = () => {
    if (node.type === "folder") {
      setExpanded(!expanded);
      setSelectedFile(undefined);
    } else {
      onFileClick(node);
    }
  };

  return (
    <div className="ml-2">
      <div
        className="group flex items-center justify-between cursor-pointer px-1 py-1 rounded hover:bg-gray-200"
        onClick={handleClick}
      >
        <div className="flex items-center gap-2">
          {node.type === "folder" && <span>{expanded ? "▾" : "▸"}</span>}

          {node.type === "folder" ? (
            <svg
              className="w-4 h-4 text-yellow-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M2 4a2 2 0 012-2h4l2 2h6a2 2 0 012 2v1H2V4z" />
              <path d="M2 7h16v7a2 2 0 01-2 2H4a2 2 0 01-2-2V7z" />
            </svg>
          ) : (
            <svg
              className="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M4 4h16v16H4z" />
              <path d="M4 8h16" strokeWidth="1" />
            </svg>
          )}

          {renaming ? (
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onBlur={() => {
                onRename(node, newName);
                setRenaming(false);
              }}
              autoFocus
              className="border border-gray-300 px-1 py-0.5 text-sm text-gray-700 rounded"
            />
          ) : (
            <span className="text-sm">{node.name}</span>
          )}
        </div>

        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setRenaming(true);
            }}
            className="text-xs text-gray-500 hover:text-gray-800"
            title="Rename"
          >
            ✏️
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(node);
            }}
            className="text-xs text-red-500 hover:text-red-700"
            title="Delete"
          >
            ❌
          </button>
          {node.type === "folder" && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAdd(node);
              }}
              className="text-xs text-green-500 hover:text-green-700"
              title="Add"
            >
              ➕
            </button>
          )}
        </div>
      </div>

      {expanded && node.children?.length > 0 && (
        <div className="ml-4 border-l border-gray-300 pl-2">
          {node.children.map((child) => (
            <Tree
              key={child.id}
              node={child}
              onFileClick={onFileClick}
              onRename={onRename}
              onDelete={onDelete}
              onAdd={onAdd}
              setSelectedFile={setSelectedFile}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Tree;
