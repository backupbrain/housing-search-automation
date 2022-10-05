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
    search: { profileId: search.profileId },
    wasContacted: false,
    wasAnalyzed: false,
  };
  if (desiredDistricts.length > 0) {
    where.district = { in: desiredDistricts };
  }
  if (search.minPrice) {
    where.rentPrice_gte = search.minPrice;
  }
  if (search.maxPrice) {
    where.rentPrice_lte = search.maxPrice;
  }
  if (search.startDateMin) {
    where.startDate_gte = search.startDateMin;
  }
  if (search.startDateMax) {
    where.startDate_lte = search.startDateMax;
  }
  if (search.endDateMin) {
    where.endDate_gte = search.endDateMin;
  }
  if (search.endDateMax) {
    where.endDate_lte = search.endDateMax;
  }
  if (search.minRoomSizeSquareMeters) {
    where.roomSizeSquareMeters_lte = search.minRoomSizeSquareMeters;
  }
  if (search.mustBeFurnished) {
    where.isFurnished = true;
  }
  if (search.needsWashingMachine) {
    where.hasWashingMachine = true;
  }
  if (search.needsWashingMachine) {
    where.hasWifi = true;
  }
  if (search.mustBeStudensOk) {
    where.studentsOk = true;
  }
  if (search.mustBeEnglishOk) {
    where.englishOk = true;
  }
  if (search.mustBeMalesOk) {
    where.malesOk = true;
  }
  if (search.mustBeLgbtqOk) {
    where.lgbtqOk = true;
  }
  if (search.mustBeNonSmoking) {
    where.nonSmoking = true;
  }
  return await prisma.offer.findMany({ where });
};
