# Latvian Namedays Card for Home Assistant (Latviešu vārda dienu integrācija Home Assistant)

A simple custom Lovelace card that displays **Latvian name days** for the current date in Home Assistant. The card uses a bundled JSON file (`namedays.json`) containing the name day data, fetched automatically.

> **Note:** This card is designed specifically for Latvian name days.



![Screenshot from HA with Card](https://i.imghippo.com/files/OOvY2894HEY.png "screenshot")

## Installation via HACS

1. Open **HACS** in Home Assistant.
2. Go to **Frontend** > click the **...** (three-dot) menu in the top-right > **Custom repositories**.
3. Add this repository's URL and select **Lovelace** as the category.
4. After adding, find **Latvian Namedays Card** in HACS under **Frontend**.
5. Click **Install**.
6. If your Home Assistant version doesn't automatically add the resource, go to **Settings** > **Dashboards** > **Resources** and add:
   ```yaml
   url: /hacsfiles/namedays-card/namedays-card.js
   type: module
   ```
7. **Restart** Home Assistant, or perform a **hard refresh** of your Lovelace dashboard to ensure the new files load.

## Manual Installation (Optional)

If you prefer not to use HACS:

1. Download `namedays-card.js` and `namedays.json` from the repository.
2. Place them in your Home Assistant `www` folder, e.g.:
   ```
   /config/www/namedays-card/namedays-card.js
   /config/www/namedays-card/namedays.json
   ```

## Usage

After installation, you can add the card to your Lovelace dashboard:

1. Edit your Lovelace dashboard.
2. Click **Add Card** > **Manual**.
3. Use the following configuration:
   ```yaml
   type: custom:namedays-card
   title: Namedays
   ```
4. Save. The card will show today's Latvian name days based on the data in `namedays.json`.

## Configuration Options

Currently, there are no extra configuration options. The card automatically fetches `namedays.json` from the same directory. Future updates may add the ability to specify a custom JSON path or other settings.

## Updating

If using HACS, updates will appear in HACS whenever a new release is published. Simply click **Update** in HACS to get the latest version.

For manual installations, download the updated `namedays-card.js` and `namedays.json` files and replace the old ones in your `www/namedays-card/` folder.

## Support & Contributing

If you find an issue or have suggestions for improvement:

1. Open an issue on GitHub
2. Submit a pull request if you have a fix or new feature

## License

This project is licensed under the MIT License. Feel free to use or modify the code for your own Home Assistant setup.
