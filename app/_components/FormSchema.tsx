import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
export const formSchema = z.object({
  name: z.string().min(3).max(100),
  originalUrl: z.string().url(),
});
