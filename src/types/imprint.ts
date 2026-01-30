export interface Imprint {
  id: string;
  year: string;
  title: {
    vi: string;
    en: string;
  };
  org?: {
    vi: string;
    en: string;
  };
  memory: {
    vi: string;
    en: string;
  };
  /**
   * Optional local image under /public (e.g. "/asset/rocket.png")
   * Max 1 image per imprint.
   */
  image?: string;
  highlight?: boolean;
}

