type QueryData<Value> = { success: true; data: Value };

type QueryFailure = { success: false; error: string };

export type SettledQuery<Value> = QueryData<Value> | QueryFailure;

export async function settleQuery<Value>(query: PromiseLike<Value>): Promise<SettledQuery<Value>> {
  try {
    return { success: true, data: await query };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : String(error) };
  }
}
