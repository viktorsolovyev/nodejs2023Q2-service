-- DropForeignKey
ALTER TABLE "Album_To_Favorites" DROP CONSTRAINT "Album_To_Favorites_albumId_fkey";

-- DropForeignKey
ALTER TABLE "Artist_To_Favorites" DROP CONSTRAINT "Artist_To_Favorites_artistId_fkey";

-- DropForeignKey
ALTER TABLE "Track_To_Favorites" DROP CONSTRAINT "Track_To_Favorites_trackId_fkey";

-- AddForeignKey
ALTER TABLE "Artist_To_Favorites" ADD CONSTRAINT "Artist_To_Favorites_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Album_To_Favorites" ADD CONSTRAINT "Album_To_Favorites_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track_To_Favorites" ADD CONSTRAINT "Track_To_Favorites_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;
