import { getSearch } from "./getSearch";

const { prisma } = require("./database/client");

export let getUnprocessedOffers = async (searchId) => {
  const search = await getSearch(searchId);
  if (!search) {
    throw new Error("Search not found");
  }
  const desiredDistricts = JSON.parse(search.districts) || [];
  // there may be offers from other searches we haven't contacted that were
  // visited and therefore not re-scraped
  const where = {
    searchId,
    // search: { profileId: search.profileId },
    wasContacted: false,
    wasAnalyzed: false,
  };
  if (desiredDistricts.length > 0) {
    where.district = { in: desiredDistricts };
  }
  if (search.minPrice) {
    where.rentPrice = { gte: search.minPrice };
  }
  if (search.maxPrice) {
    where.rentPrice = { lte: search.maxPrice };
  }
  if (search.startDateMin) {
    where.startDate = { gte: search.startDateMin };
  }
  if (search.startDateMax) {
    where.startDate = { lte: search.startDateMax };
  }
  if (search.endDateMin) {
    where.endDate = { gte: search.endDateMin };
  }
  if (search.endDateMax) {
    where.endDate = { lte: search.endDateMax };
  }
  if (search.minRoomSizeSquareMeters) {
    where.roomSizeSquareMeters = { lte: search.minRoomSizeSquareMeters };
  }
  if (search.mustBeFurnished) {
    where.isFurnished = true;
  }
  if (search.needsWashingMachine) {
    where.hasWashingMachine = true;
  }
  if (search.needsWifi) {
    where.hasWifi = true;
  }
  if (search.mustBeStudensOk) {
    where.studentsOk = true;
  }
  if (search.mustBeEnglishOk) {
    where.englishOk = true;
  }
  // if (search.mustBeMalesOk) {
  //   where.malesOk = true;
  // }
  if (search.mustBeLgbtqOk) {
    where.lgbtqOk = true;
  }
  if (search.mustBeNonSmoking) {
    where.nonSmoking = true;
  }
  console.log({ where });
  return await prisma.offer.findMany({ where });
};
