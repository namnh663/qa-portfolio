import supabase from '../../services/supabaseClient';

export class DataHelper {
  static async fetchAllData() {
    const [aboutData, skillsData, projectsData, experienceData, certificatesData] = await Promise.all([
      supabase.from('about_me').select('*').single(),
      supabase.from('skills').select('*'),
      supabase.from('projects').select('*'),
      supabase.from('experience').select('*'),
      supabase.from('certificates').select('*')
    ]);

    return {
      about: aboutData.data,
      skills: skillsData.data,
      projects: projectsData.data,
      experience: experienceData.data,
      certificates: certificatesData.data
    };
  }
}