import { StaticImageData } from "next/image";

export type SectionListType = {
    sectionId: number;
    sectionType: string;
    sectionTitle: string;
    sectionStatus: string;
}

export type StandardProgramListType = {
    programId: number;
    title: string;
    programStatus: string;
    programImage: StaticImageData;
    sections: SectionListType[];
};