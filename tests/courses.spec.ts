require("dotenv").config();
import { test, expect } from "@playwright/test";

const haslo = process.env.PLATFORMA_HASLO;

[
  "Bazy_danych_Inf_NieS",
  // "Rachunek prawdopodobieństwa i statystyka 2025/26 (informatyka, niestacjonarne, st. I, sem. 5)",
  "Zarządzanie systemami informatycznymi 2025/2026 (Informatyka, studia niestacjonarne, st. I, sem. 4)",
  //"Matematyka Dyskretna 2025/26 (informatyka, niestacjonarne, st. I, sem. 4)",
  "Systemy sztucznej inteligencji (Informatyka st. I sem. 4, studia niestacjonarne)"
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
    await page.evaluate(() => {
      const element = document.querySelector('#usernavigation');
      if (element) {
        element.remove();
      }
    });
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
  await page.getByRole("button", { name: "Semestr letni 2025/2026" }).click();
  await page.getByRole("button", { name: "Semestr letni 2026/2027" }).click();
  await expect(page).toHaveScreenshot({ fullPage: true });
});
