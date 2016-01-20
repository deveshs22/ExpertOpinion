using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Data.Models.Mapping
{
    public class HospitalSpecialityDetailMap : EntityTypeConfiguration<HospitalSpecialityDetail>
    {
        public HospitalSpecialityDetailMap()
        {
            // Primary Key
            this.HasKey(t => t.HospitalSpecialityDetailId);

            // Properties
            // Table & Column Mappings
            this.ToTable("HospitalSpecialityDetail");
            this.Property(t => t.HospitalSpecialityDetailId).HasColumnName("HospitalSpecialityDetailId");
            this.Property(t => t.HospitalId).HasColumnName("HospitalId");
            this.Property(t => t.HospitalSpecialityId).HasColumnName("HospitalSpecialityId");

            // Relationships
            this.HasRequired(t => t.Hospital)
                .WithMany(t => t.HospitalSpecialityDetails)
                .HasForeignKey(d => d.HospitalId);
            this.HasRequired(t => t.HospitalSpeciality)
                .WithMany(t => t.HospitalSpecialityDetails)
                .HasForeignKey(d => d.HospitalSpecialityId);

        }
    }
}
