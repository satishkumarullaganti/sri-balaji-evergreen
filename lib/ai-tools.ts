
import { propertyDetails } from "@/data/property-details";

export type PropertyTopic =
  | "pricing"
  | "amenities"
  | "floor_areas"
  | "specifications"
  | "availability";

export function getPropertyDetails(topic: PropertyTopic) {
  const topics = {
    pricing: propertyDetails.pricing,
    amenities: propertyDetails.amenities,
    floor_areas: propertyDetails.floorAreas,
    specifications: propertyDetails.specifications,
    availability: propertyDetails.availability,
  };

  return {
    tool: "get_property_details",
    projectName: propertyDetails.projectName,
    developerName: propertyDetails.developerName,
    topic,
    information: topics[topic],
    configurations: propertyDetails.configurations,
    enquiryOnly: propertyDetails.enquiryOnly,
    enquiryInstructions: propertyDetails.enquiryInstructions,
  };
}
