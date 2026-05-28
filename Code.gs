const FOLDER_ID = '1V5VbwXVJqkdzhljFdRuy4f5WXDp0cf4Y';

function doGet() {
  const result = {};
  const parent = DriveApp.getFolderById(FOLDER_ID);
  const subfolders = parent.getFolders();

  while (subfolders.hasNext()) {
    const sub = subfolders.next();
    const category = sub.getName();
    const files = [];
    const fileIterator = sub.getFiles();

    while (fileIterator.hasNext()) {
      const file = fileIterator.next();
      files.push({
        archivo: file.getName(),
        id: file.getId()
      });
    }

    result[category] = files;
  }

  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}
