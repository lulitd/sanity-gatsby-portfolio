import React from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import {SEO} from "../components/seo";
import Layout from "../containers/layout";
import AnimHello from "../animIcons/animHello";
import {Label, Input, Textarea, Button} from "theme-ui";
import {Heading, Box, Flex } from "theme-ui";
import { Themed } from '@theme-ui/mdx';

export const query = graphql`
  query ContactQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      contactEmail
    }
  }
`;

const ContactPage = (props) => {
  const { data, errors } = props;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const site = (data || {}).site;

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }
  return (
    <Layout>
      <Container>
      <Heading as="h1" variant={'text.barcodes'} fontSize={[8]}>Say Hello</Heading>
        <Flex>
          <Flex flex="3">
            <Box
              as="form"
              id="contact-form"
              method="POST"
              action="https://usebasin.com/f/aeb507374cd0"
              role="form"
            >
              <Themed.p>
                Whether for a potential project or just to say hi, my inbox is always open.
              </Themed.p>
              <Flex alignItems="center">
                <Flex flexDirection="column" pr="2" flex="50%">
                  <Label htmlFor="form_name" variant="labelRequired">
                    Name
                  </Label>
                  <Input
                    id="form_name"
                    type="text"
                    name="name"
                    placeholder="Please enter your name"
                    required="required"
                    data-error="Name is required."
                  />
                </Flex>
                <Flex flexDirection="column" flex="50%">
                  <Label htmlFor="form_email" variant="labelRequired">
                    Email
                  </Label>
                  <Input
                    id="form_email"
                    type="email"
                    name="email"
                    placeholder="Please enter your email"
                    required="required"
                    data-error="Valid email is required."
                  />
                </Flex>
              </Flex>
              <Label htmlFor="form_message" variant="labelRequired">
                Message
              </Label>
              <Textarea
                id="form_message"
                name="message"
                placeholder="Message for me"
                rows="6"
                required="required"
                data-error="Please, leave a message."
              ></Textarea>
              <Button type="submit" variant="outlineBtn">
                {" "}
                Get In Touch
              </Button>
              <Themed.p>I'll try my best to answer your email!</Themed.p>
            </Box>
          </Flex>
          <Box
            flex="1"
            as="aside"
            px="2"
            py="1"
            sx={{
              display: ["none", "flex"],
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Box display="block" width="100%">
              <AnimHello />
            </Box>
          </Box>
        </Flex>
      </Container>
    </Layout>
  );
};

export default ContactPage;

export const Head = () => (
  <SEO title="Contact" />
)