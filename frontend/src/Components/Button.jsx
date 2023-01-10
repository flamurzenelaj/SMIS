import React from "react";

export default function Button({ text = "click", btnClass, icon, onClick, onSubmit }) {
    return (
        <button className={`btn ${btnClass}`} onClick={onClick}
            onSubmit={onSubmit}>
            {icon}
            {text}
        </button>
    );
}