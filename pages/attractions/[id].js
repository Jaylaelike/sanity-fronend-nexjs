import { createClient } from "next-sanity";
import Head from "next/head";
import Link from "next/link";

import imageUrlBuilder from "@sanity/image-url";

import ButtonAppBar from "../../components/ButtonAppBar";

import {
  Container,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import React from "react";

export default function Attractions({ attraction }) {
  return (
    <div>
      <Head>
        <title>Create Nest App</title>
        <meta name="description" content="Generate app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ButtonAppBar />

      <main>
        <Container maxWidth="sm" sx={{ mt: 2 }}>
          <Card>
            <CardMedia
              component="img"
              height="300"
              image={urlFor(attraction?.coverimage).width(300).url()}
              alt={attraction?.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {attraction?.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {attraction?.detail}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Latitude : {attraction?.latitude} , longitude :{" "}
                {attraction?.longitude}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {attraction?.longitude}
              </Typography>
            </CardContent>
            <CardActions>
              <Link href={"/"}>
                <Button size="small">กลับบ้าน</Button>
              </Link>
            </CardActions>
          </Card>
        </Container>
      </main>
    </div>
  );
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  useCdn: false,
});

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(client);

function urlFor(source) {
  return builder.image(source);
}

export async function getStaticPaths() {
  const attractions = await client.fetch(`*[_type == "attraction"]`);
  const paths = attractions.map((attraction) => ({
    params: { id: attraction._id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const attractions = await client.fetch(
    `*[_type == "attraction" && _id == "${params.id}"]`
  );

  if (attractions.length > 0) {
    const attraction = attractions[0];
    return { props: { attraction }, revalidate: 10 };
  } else {
    return { props: {}, revalidate: 10,};
  }
}
