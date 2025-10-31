
import fs from "fs"
import path from "path"
import fetch from "node-fetch"

export const LICENSE_SERVER_URL = "http://localhost:8004/validate?license="
export const whiteListedDomains = []
export const failure = fs.readFileSync("Checkfailed.html", "utf8")
export const placeholder = fs.readFileSync("placeholder.svg", "utf8")

export async function MasqFail(req, reply) {
  if (!req.headers.host) return

  const unsafeSuffix = req.headers.host + ".html"
  const safeSuffix = path.normalize(unsafeSuffix).replace(/^(\.\.(\\/|\\\\|$))+/, "")
  const safeJoin = path.join(process.cwd(), "Masqrd", safeSuffix)

  try {
    await fs.promises.access(safeJoin)
    const bruh = await fs.promises.readFile(safeJoin, "utf8")
    reply.header("Content-Type", "text/html").send(bruh)
  } catch {
    reply.header("Content-Type", "text/html").send(failure)
  }
}

export async function MasqrMiddleware(req, reply) {
  return;
}
