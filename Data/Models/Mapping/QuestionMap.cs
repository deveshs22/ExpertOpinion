using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Data.Models.Mapping
{
    public class QuestionMap : EntityTypeConfiguration<Question>
    {
        public QuestionMap()
        {
            // Primary Key
            this.HasKey(t => t.QuestionId);

            // Properties
            //this.Property(t => t.QuestionId)
            //    .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.PatientGender)
                .HasMaxLength(10);

            this.Property(t => t.Attach1)
                .HasMaxLength(1000);

            this.Property(t => t.Attach2)
                .HasMaxLength(1000);

            this.Property(t => t.Attach3)
                .HasMaxLength(1000);

            // Table & Column Mappings
            this.ToTable("Question");
            this.Property(t => t.QuestionId).HasColumnName("QuestionId");
            this.Property(t => t.Description).HasColumnName("Description");
            this.Property(t => t.UserId).HasColumnName("UserId");
            this.Property(t => t.PatientAge).HasColumnName("PatientAge");
            this.Property(t => t.PatientGender).HasColumnName("PatientGender");
            this.Property(t => t.VisitedDoctor).HasColumnName("VisitedDoctor");
            this.Property(t => t.Remarks).HasColumnName("Remarks");
            this.Property(t => t.Attach1).HasColumnName("Attach1");
            this.Property(t => t.Attach2).HasColumnName("Attach2");
            this.Property(t => t.Attach3).HasColumnName("Attach3");
            this.Property(t => t.Active).HasColumnName("Active");
            this.Property(t => t.CreatedOn).HasColumnName("CreatedOn");
            this.Property(t => t.PaymentMade).HasColumnName("PaymentMade");
            this.Property(t => t.ExpertId).HasColumnName("ExpertId");
            this.Property(t => t.ExpertReply).HasColumnName("ExpertReply");
            this.Property(t => t.RepliedOn).HasColumnName("RepliedOn");
            this.Property(t => t.LastModifiedOn).HasColumnName("LastModifiedOn");
            this.Property(t => t.LastModifiedBy).HasColumnName("LastModifiedBy");

            // Relationships
            this.HasRequired(t => t.User)
                .WithMany(t => t.Questions)
                .HasForeignKey(d => d.UserId);
            this.HasOptional(t => t.User1)
                .WithMany(t => t.Questions1)
                .HasForeignKey(d => d.ExpertId);

        }
    }
}
