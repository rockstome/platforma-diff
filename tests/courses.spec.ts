require("dotenv").config();
import { test, expect } from "@playwright/test";

const haslo = process.env.PLATFORMA_HASLO;

[
  "Informacja i kompresja danych 2025/26 (informatyka, niestacjonarne, st. I, sem",
  "Systemy operacyjne 2025/26 (Informatyka, stacjonarne, st. I, sem. 3)",
  "Algorytmy i struktury danych (Informatyka st. I sem. 3, studia niestacjonarne)",
  "Języki skryptowe (Informatyka st. I sem. 3, studia niestacjonarne)",
  "MN-niestacjonarne-2025_26",
  "Programowanie III (Informatyka st. I sem. 3, studia niestacjonarne)",
].forEach((course) => {
  test(`checking course: '${course}'`, async ({ page }) => {
    await page.goto("https://platforma.polsl.pl/rms/");
    await page.getByRole("link", { name: "Zaloguj się" }).click();
    await page
      .getByRole("textbox", { name: "Nazwa użytkownika" })
      .fill("ts316056");
    await page.getByRole("textbox", { name: "Hasło" }).fill(haslo as string);
    await page.getByRole("button", { name: "Zaloguj się" }).click();
    await page.getByRole("link", { name: course }).click();
    await page.getByRole("menuitem", { name: "Oceny" }).click();
    await expect(page).toHaveScreenshot({ fullPage: true });
  });
});

test(`checking usos`, async ({ page }) => {
  await page.goto("https://usoscas.polsl.pl/cas/login?locale=pl");
  await page.getByRole("textbox", { name: "Identyfikator" }).fill("ts316056");
  await page.getByRole("textbox", { name: "Hasło" }).fill(haslo as string);
  await page.getByRole("button", { name: "Zaloguj się" }).click();
  await page.goto(
    "https://usosweb.polsl.pl/kontroler.php?_action=dla_stud/studia/oceny/index",
  );
  await expect(page).toHaveScreenshot({ fullPage: true });
});
