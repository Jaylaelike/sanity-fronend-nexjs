import Head from "next/head";
import Link from "next/link";
import { createClient } from "next-sanity";
import ButtonAppBar from "../components/ButtonAppBar";
import imageUrlBuilder from "@sanity/image-url";
import {
  Container,
  Grid,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import React from "react";

export default function Home({ attractions }) {
  return (
    <div>
      <Head>
        <title>Create Nest App</title>
        <meta name="description" content="Generate app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ButtonAppBar />
      <main>
        <Container maxWidth="lg">
          <h2>Attractions</h2>
          <Grid container spacing={2}>
            {attractions.length > 0 && (
              <React.Fragment>
                {attractions.map((attraction) => (
                  <Grid item xs={12} md={4}>
                    <Card>
                      <CardMedia
                        component="img"
                        height="175"
                        image={urlFor(attraction?.coverimage).width(300).url()}
                        alt={attraction?.name}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {attraction?.name}
                        </Typography>
                        <Typography variant="body2" noWrap={true}  color="text.secondary">
                          {attraction?.detail}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Link href={"/attractions/" + attraction?._id}>
                          <Button size="small">ดูต่อนะ</Button>
                        </Link>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </React.Fragment>
            )}
          </Grid>
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

export async function getStaticProps() {
  const attractions = await client.fetch(`*[_type == "attraction"]`);
  console.log(attractions);
  return {
    props: {
      attractions,
    },
  };
}
