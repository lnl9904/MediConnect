import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../Context/Context';

/**
 * ProtectedRoute usage examples:
 * - Require login: <Route element={<ProtectedRoute />}>
 * - Require role: <Route element={<ProtectedRoute requiredRoles={["admin"]} />}>
 */
export default function ProtectedRoute({ requiredRoles }) {
  const { user, role } = useContext(AuthContext);

  if (!user) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (requiredRoles && requiredRoles.length > 0 && !requiredRoles.includes(role)) {
    // Logged in but doesn't have required role
    return <Navigate to="/" replace />;
  }

  // Authorized — render nested routes
  return <Outlet />;
}
