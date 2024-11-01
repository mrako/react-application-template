export const check = async (ctx: any) => {
  try {
    if (ctx.prisma) {
      ctx.status = 200;
    } else {
      ctx.status = 500;
    }
  } catch (e) {
    ctx.status = 500;
  }
};
