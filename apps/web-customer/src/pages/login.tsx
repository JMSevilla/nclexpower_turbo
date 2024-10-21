import React from "react";
import { LoginFormBlock } from "../components/blocks/LoginFormBlock/LoginFormBlock";
import { GetServerSideProps } from "next";
import { withCSP } from "core-library";

const LoginPage: React.FC = () => <LoginFormBlock />;

export const getServerSideProps: GetServerSideProps = withCSP();

export default LoginPage;
