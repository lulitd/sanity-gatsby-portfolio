import clientConfig from "../../client-config";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(clientConfig.sanity);

export function imageUrlFor(source) {
  console.log(source);
  if (!source) return null;
  return builder.image(source);
}
