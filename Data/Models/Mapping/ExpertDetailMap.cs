using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Data.Models.Mapping
{
    public class ExpertDetailMap : EntityTypeConfiguration<ExpertDetail>
    {
        public ExpertDetailMap()
        {
            // Primary Key
            this.HasKey(t => new { t.ExpertDetailId, t.UserId });

            // Properties
            this.Property(t => t.ExpertDetailId)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

            this.Property(t => t.UserId)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.Gender)
                .HasMaxLength(10);

            this.Property(t => t.Phone)
                .HasMaxLength(50);

            this.Property(t => t.Mobile)
                .HasMaxLength(50);

            this.Property(t => t.Address)
                .HasMaxLength(200);

            this.Property(t => t.Photo)
                .HasMaxLength(100);

            this.Property(t => t.LicenceNo)
                .HasMaxLength(100);

            this.Property(t => t.Issuer)
                .HasMaxLength(100);

            this.Property(t => t.IssuerContact)
                .HasMaxLength(50);

            this.Property(t => t.Resume)
                .HasMaxLength(50);

            this.Property(t => t.Certificate1)
                .HasMaxLength(50);

            this.Property(t => t.Certificate2)
                .HasMaxLength(50);

            this.Property(t => t.Certificate3)
                .HasMaxLength(50);

            this.Property(t => t.Qualification)
                .HasMaxLength(300);


            // Table & Column Mappings
            this.ToTable("ExpertDetail");
            this.Property(t => t.ExpertDetailId).HasColumnName("ExpertDetailId");
            this.Property(t => t.UserId).HasColumnName("UserId");
            this.Property(t => t.DOB).HasColumnName("DOB");
            this.Property(t => t.Gender).HasColumnName("Gender");
            this.Property(t => t.Phone).HasColumnName("Phone");
            this.Property(t => t.Mobile).HasColumnName("Mobile");
            this.Property(t => t.Address).HasColumnName("Address");
            this.Property(t => t.CountryId).HasColumnName("CountryId");
            this.Property(t => t.StateId).HasColumnName("StateId");
            this.Property(t => t.CityId).HasColumnName("CityId");
            this.Property(t => t.Photo).HasColumnName("Photo");
            this.Property(t => t.SpecialityId).HasColumnName("SpecialityId");
            this.Property(t => t.LicenceNo).HasColumnName("LicenceNo");
            this.Property(t => t.Issuer).HasColumnName("Issuer");
            this.Property(t => t.IssuerCountryId).HasColumnName("IssuerCountryId");
            this.Property(t => t.IssuerStateId).HasColumnName("IssuerStateId");
            this.Property(t => t.IssuerContact).HasColumnName("IssuerContact");
            this.Property(t => t.Resume).HasColumnName("Resume");
            this.Property(t => t.Certificate1).HasColumnName("Certificate1");
            this.Property(t => t.Certificate2).HasColumnName("Certificate2");
            this.Property(t => t.Certificate3).HasColumnName("Certificate3");
	    this.Property(t => t.Qualification).HasColumnName("Qualification");
            this.Property(t => t.Description).HasColumnName("Description");

            // Relationships
            this.HasOptional(t => t.City)
                .WithMany(t => t.ExpertDetails)
                .HasForeignKey(d => d.CityId);
            this.HasOptional(t => t.Country)
                .WithMany(t => t.ExpertDetails)
                .HasForeignKey(d => d.CountryId);
            this.HasOptional(t => t.Country1)
                .WithMany(t => t.ExpertDetails1)
                .HasForeignKey(d => d.IssuerCountryId);
            this.HasOptional(t => t.State)
                .WithMany(t => t.ExpertDetails)
                .HasForeignKey(d => d.StateId);
            this.HasOptional(t => t.State1)
                .WithMany(t => t.ExpertDetails1)
                .HasForeignKey(d => d.IssuerStateId);
            this.HasRequired(t => t.User)
                .WithMany(t => t.ExpertDetails)
                .HasForeignKey(d => d.UserId);

        }
    }
}
