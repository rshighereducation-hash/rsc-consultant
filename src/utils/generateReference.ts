import Counter from "@/models/Counter";

export async function generateReference(): Promise<string> {
  const year = new Date().getFullYear();

  const counter = await Counter.findByIdAndUpdate(
    `studentReference-${year}`,
    { $inc: { sequence: 1 } },
    {
      new: true,
      upsert: true,
    },
  );

  const sequence = String(counter.sequence).padStart(4, "0");

  return `RS-REF-${year}-${sequence}`;
}
