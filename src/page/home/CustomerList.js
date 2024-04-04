/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { STATUS } from "@/constants";
import { useCustomerStore } from "@/store/customer";
import { Box, Center, Spinner, Text, useColorModeValue } from "@chakra-ui/react";
import { map } from "lodash";
import { useRouter, useSearchParams } from "next/navigation";

import React, { useEffect, useState } from "react";

export const CustomerList = ({ setSelected, selected }) => {
  const { getCustomerAction, getCustomerStatus, customerData } = useCustomerStore((s) => ({
    getCustomerAction: s.getCustomerAction,
    getCustomerStatus: s.getCustomerStatus,
    customerData: s.customerData,
  }));

  useEffect(() => {
    getCustomerAction();
  }, [getCustomerAction]);

  return (
    <Box w={"30%"} borderRight={"1px solid #DEDEDE"} h={"100vh"} overflowY={"scroll"}>
      {getCustomerStatus === STATUS.FETCHING ? (
        <Center h={"100%"}>
          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
        </Center>
      ) : (
        map(customerData, (customer) => {
          return (
            <Box
              key={customer.id}
              borderBottom={"1px solid #DEDEDE"}
              p={6}
              py={4}
              cursor={"pointer"}
              bg={selected.id === customer.id ? "#e8e8e8" : "white"}
              onClick={() => setSelected(customer)}
            >
              <Text fontWeight={"bold"} fontSize={"x-large"}>
                Customer {customer.id}
              </Text>
              <Text fontSize={"15px"} mt={3}>
                {customer.body}
              </Text>
            </Box>
          );
        })
      )}
    </Box>
  );
};
