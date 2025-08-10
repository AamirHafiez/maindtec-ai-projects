import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import projectsNetworkAdapter from "@/features/projects/projectsNetworkAdapter";
import Link from "next/link";

export default async function Profile() {
  const profileData = await projectsNetworkAdapter.getProfile();

  return (
    <div className="flex flex-col h-screen items-center pt-10 px-4">
      <Card className="max-w-md w-full">
        <CardHeader className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>Avatar</AvatarFallback>
          </Avatar>
          <p className="text-lg font-semibold">Welcome, {profileData.name}</p>
        </CardHeader>
        <hr />
        <CardContent className="space-y-2">
          <p>
            <strong>Email:</strong> {profileData.email}
          </p>
          {profileData.username && (
            <p>
              <strong>Username:</strong> {profileData.username}
            </p>
          )}
          {profileData.bio && (
            <p>
              <strong>Bio:</strong> {profileData.bio}
            </p>
          )}
          {profileData.location && (
            <p>
              <strong>Location:</strong> {profileData.location}
            </p>
          )}
          {profileData.phone && (
            <p>
              <strong>Phone:</strong> {profileData.phone}
            </p>
          )}
          {profileData.jobTitle && (
            <p>
              <strong>Job Title:</strong> {profileData.jobTitle}
            </p>
          )}
          {profileData.company && (
            <p>
              <strong>Company:</strong> {profileData.company}
            </p>
          )}
          {profileData.website && (
            <p>
              <strong>Website:</strong>{" "}
              <Link
                href={profileData.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                {profileData.website}
              </Link>
            </p>
          )}
          {profileData.joinedDate && (
            <p>
              <strong>Joined:</strong>{" "}
              {new Date(profileData.joinedDate).toLocaleDateString()}
            </p>
          )}

          {/* Social Links */}
          {profileData.socialLinks && (
            <div className="flex space-x-4 mt-4">
              {profileData.socialLinks.twitter && (
                <Link
                  href={profileData.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                >
                  Twitter
                </Link>
              )}
              {profileData.socialLinks.linkedin && (
                <Link
                  href={profileData.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  LinkedIn
                </Link>
              )}
              {profileData.socialLinks.github && (
                <Link
                  href={profileData.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  Github
                </Link>
              )}
              {profileData.socialLinks.facebook && (
                <Link
                  href={profileData.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  Facebook
                </Link>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
