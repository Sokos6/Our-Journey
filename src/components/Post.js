import React from "react";
import "../styles/App.css";
import { gql } from "apollo-boost";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import Like from "./Like.js";
import { timeDifferenceForDate } from "../utils/TimeDifference.js";
import { Container } from "react-bootstrap";

export const POST_INFO = gql`
  query($id: Int!) {
    Post(where: { id: { _eq: $id } }) {
      id
      caption
      created_at
      url
      User {
        avatar
        id
        name
      }
    }
  }
`;