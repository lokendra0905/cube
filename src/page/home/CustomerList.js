/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { STATUS } from "@/constants";
import { useCustomerStore } from "@/store/customer";
import { Box, Center, Spinner, Text, useColorModeValue } from "@chakra-ui/react";
import { map } from "lodash";
// import { useRouter, useSearchParams } from "next/navigation";

import React, { useEffect, useRef, useState } from "react";
// import InfiniteScroll from "react-infinite-scroll-component";

export const CustomerList = ({ setSelected, selected }) => {
  const [page, setPage] = useState(1);
  const { getCustomerAction, getCustomerStatus, customerData } = useCustomerStore((s) => ({
    getCustomerAction: s.getCustomerAction,
    getCustomerStatus: s.getCustomerStatus,
    customerData: s.customerData,
  }));

  const handleScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >
        document.documentElement.scrollHeight
      ) {
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    getCustomerAction({ _limit: 5, _page: page });
  }, [getCustomerAction, page]);

  return (
    <Box w={"30%"} borderRight={"1px solid #DEDEDE"}>
      {!customerData && getCustomerStatus === STATUS.FETCHING ? (
        <Center h={"100%"}>
          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
        </Center>
      ) : (
        <Box>
          {map(customerData, (customer, index) => {
            return (
              <Box
                key={index}
                borderBottom={"1px solid #DEDEDE"}
                p={6}
                py={4}
                cursor={"pointer"}
                bg={selected?.id === customer.id ? "#e8e8e8" : "white"}
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
          })}
        </Box>
      )}
      {customerData?.length && getCustomerStatus === STATUS.FETCHING ? (
        <Center h={"50"}>
          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
        </Center>
      ) : null}
    </Box>
  );
};
