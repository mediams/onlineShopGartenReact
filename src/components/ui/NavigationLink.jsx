import React from "react";
import { NavLink } from "react-router";

export default function NavigationLink({ to, label, className }) {
  return (
    <NavLink className={className} to={to} label={label}>
      {label}
    </NavLink>
  );
}
