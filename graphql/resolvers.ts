import { prisma } from "@prisma/client"
import prismaClient from "../lib/prisma"

export const resolvers = {
  Query: {
    links: async (_parent, args, context) => await context.prismaClient.link.findMany()
  }
}