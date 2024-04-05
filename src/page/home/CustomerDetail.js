import { STATUS } from "@/constants";
import { useCustomerStore } from "@/store/customer";
import { Box, Center, Grid, GridItem, Heading, Image, Spinner, Text } from "@chakra-ui/react";
import { map } from "lodash";
import React, { useEffect } from "react";

export const CustomerDetail = ({ data }) => {
  const { getImageAction, getImageStatus, imageData } = useCustomerStore((s) => ({
    getImageAction: s.getImageAction,
    getImageStatus: s.getImageStatus,
    imageData: s.imageData,
  }));

  useEffect(() => {
    setInterval(() => {
      getImageAction({ count: 6, client_id: "7UMvQO386Wa8BAv4E9SI0ALU70tmrXFweDRbAdvBe9c" });
    }, 10000);
  }, [getImageAction]);

  return (
    <Box
      w={"70%"}
      bg={"#e8e8e8"}
      p={10}
      textAlign={"center"}
      maxH={"100vh"}
      overflowY={"scroll"}
      position={"fixed"}
      right={0}
      onScroll={(e) => e.stopPropagation()}
    >
      <Box w={"70%"} m={"auto"}>
        <Heading>Customer {data.id}</Heading>
        <Text mt={5}>{data.body}</Text>

        {getImageStatus === STATUS.FETCHING ? (
          <Center h={"600"}>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Center>
        ) : (
          <Grid templateColumns="repeat(3, 1fr)" gap={6} mt={10}>
            {map(imageData, (image,index) => {
              return (
                <GridItem h={300} key={index}>
                  <Image
                    src={image.urls.small}
                    alt={image.color}
                    w={"100%"}
                    h={"100%"}
                    borderRadius={"10"}
                  />
                </GridItem>
              );
            })}
          </Grid>
        )}
      </Box>
    </Box>
  );
};
