using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace Data.Models.Mapping
{
    public class FollowUpMap : EntityTypeConfiguration<FollowUp>
    {
        public FollowUpMap()
        {
            // Primary Key
            this.HasKey(t => t.FollowUpId);

            // Properties
            this.Property(t => t.FollowUpQuestion)
                .IsRequired();

            // Table & Column Mappings
            this.ToTable("FollowUp");
            this.Property(t => t.FollowUpId).HasColumnName("FollowUpId");
            this.Property(t => t.QuestionId).HasColumnName("QuestionId");
            this.Property(t => t.FollowUpQuestion).HasColumnName("FollowUpQuestion");
            this.Property(t => t.FolllowUpIndex).HasColumnName("FolllowUpIndex");
            this.Property(t => t.UserId).HasColumnName("UserId");
            this.Property(t => t.CreatedOn).HasColumnName("CreatedOn");
            this.Property(t => t.ExpertReply).HasColumnName("ExpertReply");
            this.Property(t => t.ExpertId).HasColumnName("ExpertId");
            this.Property(t => t.RepliedOn).HasColumnName("RepliedOn");
            this.Property(t => t.Active).HasColumnName("Active");
            this.Property(t => t.LastModifiedOn).HasColumnName("LastModifiedOn");
            this.Property(t => t.LastModifiedBy).HasColumnName("LastModifiedBy");

            // Relationships
            this.HasRequired(t => t.Question)
                .WithMany(t => t.FollowUps)
                .HasForeignKey(d => d.QuestionId);
            this.HasRequired(t => t.User)
                .WithMany(t => t.FollowUps)
                .HasForeignKey(d => d.UserId);
            this.HasOptional(t => t.User1)
                .WithMany(t => t.FollowUps1)
                .HasForeignKey(d => d.ExpertId);

        }
    }
}
