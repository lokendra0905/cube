'use client'
import { Box } from "@chakra-ui/react";
import { HomePage } from "@/page/home";

export default function Home() {
  return (
    <Box minH={"100vh"} bg={'white'}>
      <HomePage />
    </Box>
  );
}
