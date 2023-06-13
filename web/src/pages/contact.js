import React from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import { SEO } from "../components/seo";
import Layout from "../containers/layout";
import AnimHello from "../animIcons/animHello";
import { Label, Input, Textarea, Button } from "theme-ui";
import { Heading, Box, Flex, Grid } from "theme-ui";
import { Themed } from "@theme-ui/mdx";

const ContactPage = props => {
  const { data, errors } = props;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  return (
    <Layout>
      <Container>
        <Heading
          as="h1"
          sx={{
            marginBottom: "1rem"
          }}
        >
          Say Hello
        </Heading>
        <Grid columns={["1", "2fr 1fr"]} gap={5}>
          <Box
            sx={{
              maxWidth: "40em"
            }}
          >
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
              <Grid columns="1fr 1fr">
                <Box>
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
                </Box>
                <Box>
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
                </Box>
              </Grid>
              <Box>
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
              </Box>
              <Button type="submit" variant="outlineBtn">
                Get In Touch
              </Button>
              <Themed.p>I'll try my best to answer your email!</Themed.p>
            </Box>
          </Box>
          <Box
            as="aside"
            sx={{
              display: ["none", "block"]
            }}
          >
            <AnimHello />
          </Box>
        </Grid>
      </Container>
    </Layout>
  );
};

export default ContactPage;

export const Head = () => <SEO title="Contact" />;
