/**
 * Component Registry
 *
 * Maps component names to their React implementations.
 * This registry is used by the live preview renderer
 * to resolve component references in the AI-generated JSX.
 */

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Container from "./Container";
import Grid from "./Grid";
import Button from "./Button";
import Input from "./Input";
import Table from "./Table";
import Card from "./Card";
import Modal from "./Modal";
import Chart from "./Chart";

// Re-export all components
export {
  Navbar,
  Sidebar,
  Container,
  Grid,
  Button,
  Input,
  Table,
  Card,
  Modal,
  Chart,
};

// Registry: name → React component (used by react-live scope)
export const ComponentRegistry: Record<string, React.ComponentType<any>> = {
  Navbar,
  Sidebar,
  Container,
  Grid,
  Button,
  Input,
  Table,
  Card,
  Modal,
  Chart,
};
