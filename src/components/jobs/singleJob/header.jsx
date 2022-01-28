import React from "react";
import {
  Box,
  Heading,
  Spacer,
  Flex,
  Spinner,
  Link,
  Icon,
} from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";

import { Address, ContactInfo } from "../JobComponent";
import { useGetClientByIdQuery } from "../../../features/api/apiSlice";

const Header = ({ job }) => {
  const {
    data: client,
    isFetching,
    isSuccess,
  } = useGetClientByIdQuery(job.clientId);

  let content;

  if (isFetching) {
    content = <Spinner />;
  } else if (isSuccess) {
    content = <ContactInfo client={client} jobId={job.id} />;
  }

  return (
    <Flex bg="teal.600" borderLeftRadius="2xl" h="200px" p={2}>
      <Box marginLeft={6} alignSelf="flex-end">
        <Link as={ReactLink} to={"/jobs"}>
          <Icon
            color={"white"}
            fontSize={"3xl"}
            as={TiArrowBack}
            marginBottom={1}
            _hover={{ color: "gray.400" }}
          />
        </Link>
        {content}
      </Box>
      <Spacer />
      <Box alignSelf="flex-start">
        <Heading m={2} p={3} rounded="sm" bgColor="teal.400" size="2xl">
          {job.jobName}
        </Heading>
      </Box>
      <Spacer />
      <Box alignSelf="flex-end">
        <Address address={job.address} width={"fit-content"} />
      </Box>
    </Flex>
  );
};

export default Header;
